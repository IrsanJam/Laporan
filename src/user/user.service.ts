import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create({ username, password, email }: CreateUserDto) {
    try {
      const user = this.userRepository.create({ username, password, email });
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException('Bad Request', 400);
    }
  }

  async findAll(search: string) {
    try {
      if (!search) {
        return await this.userRepository.find();
      }
      return await this.userRepository.find({
        where: {
          email: Like(`%${search}%`),
          username: Like(`%${search}%`),
        },
      });
    } catch (error) {
      throw new HttpException('Check your configuration', 404);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('user not found');
      }
      return user;
    } catch (error) {
      throw new HttpException('Check your configuration', 404);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new NotFoundException('user not found');
      }
      return user;
    } catch (error) {
      throw new HttpException('Check your configuration', 404);
    }
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.update( +id, updateUserDto);
      if (!user) {
        throw new NotFoundException('failed, not update');
      }
      return user;
    } catch (error) {
      throw new HttpException('failed to update', 400);
    }
  }

  async remove(id: number) {
    try {
      if (!id) {
        throw new NotFoundException('field id correctly');
      }

      return await this.userRepository.delete(id);
    } catch (error) {
      throw new HttpException('failed to delete', 400);
    }
  }

  async getFriends({ id }) {
    try {
      const friends = await this.userRepository.findOneBy({ id });
      const friendIds = friends?.friends;
      if (!friendIds || friendIds.length === 0) {
        return { statusCode: 404, message: 'No friends found.', friends: [] };
      }
      const resultFriends = await this.userRepository.find({
        where: {
          id: In(friendIds),
        },
      });
      return {
        statusCode: 200,
        message: 'Success',
        friends: resultFriends,
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async setFriend({ id, otherId, status }) {
    const firstUser = await this.userRepository.findOneBy({ id });
    const secondUser = await this.userRepository.findOneBy({ id: otherId });

    // Check if user exists
    if (!firstUser || !secondUser) {
      throw new NotFoundException('User not found.');
    }

    // Check if user is blocked
    if (
      firstUser.blocked?.includes(otherId) ||
      secondUser.blocked?.includes(id)
    ) {
      return {
        status: 406,
        message: 'You cannot do this. You are blocked.',
      };
    }

    // Check if users are already friends
    if (status && firstUser.friends?.includes(otherId)) {
      return {
        statusCode: 409,
        message: 'You are already friends.',
      };
    }

    if (status) {
      await this.setRequest({ id: otherId, otherId: id, status: false });

      await this.userRepository.update(id, {
        friends: [...(firstUser.friends || []), otherId], // Append friend
      });

      await this.userRepository.update(otherId, {
        friends: [...(secondUser.friends || []), id],
      });
    } else {
      await this.userRepository.update(id, {
        friends: firstUser.friends.filter((friendId) => friendId !== otherId), // Remove friend
      });

      await this.userRepository.update(otherId, {
        friends: secondUser.friends.filter((friendId) => friendId !== id),
      });
    }

    return {
      statusCode: 200,
      message: 'User updated successfully.',
    };
  }

  async setRequest({ id, otherId, status }) {
    const firstUser = await this.userRepository.findOneBy({ id });
    const secondUser = await this.userRepository.findOneBy({ id: otherId });

    // Check if user exists
    if (!firstUser || !secondUser) {
      throw new NotFoundException('User not found.');
    }

    // Check if user is blocked
    if (
      firstUser.blocked?.includes(otherId) ||
      secondUser.blocked?.includes(id)
    ) {
      return {
        status: 406,
        message: 'You cannot do this. You are blocked.',
      };
    }

    // Check if users are already friends
    if (status && secondUser.friends?.includes(id)) {
      return {
        statusCode: 406,
        message: 'You are already friends.',
      };
    }

    // Check if request already sent
    if (status && secondUser.requests?.includes(id)) {
      return {
        statusCode: 409,
        message: 'You already sent a request to this user.',
      };
    }

    if (status) {
      await this.userRepository.update(otherId, {
        requests: [...(secondUser.requests || []), id], // Append request
      });
    } else {
      await this.userRepository.update(otherId, {
        requests: secondUser.requests.filter((requestId) => requestId !== id), // Remove request
      });
    }

    return {
      statusCode: 200,
      message: 'User updated successfully.',
    };
  }

  async getBlocked({ id }) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      // Ambil daftar ID yang diblokir
      const blockedUsers = await this.userRepository.findByIds(
        user.blocked || [],
      );

      return {
        statusCode: 200,
        blocked: blockedUsers,
      };
    } catch {
      return {
        statusCode: 404,
        message: 'Blocked users not found.',
      };
    }
  }

  async setBlocked({ id, otherId, status }) {
    const firstUser = await this.userRepository.findOneBy({ id });
    const secondUser = await this.userRepository.findOneBy({ id: otherId });

    // Check if user exists
    if (!firstUser || !secondUser) {
      throw new NotFoundException('User not found.');
    }

    // Check if user is already blocked
    if (status && firstUser.blocked?.includes(otherId)) {
      return {
        statusCode: 409,
        message: 'This user has already been blocked.',
      };
    }

    // Jika memblokir, hapus dari daftar teman dan permintaan pertemanan
    if (status) {
      await this.setFriend({ id, otherId, status: false });
      await this.setRequest({ id, otherId, status: false });

      firstUser.blocked = [...(firstUser.blocked || []), otherId];
    } else {
      firstUser.blocked = firstUser.blocked.filter(
        (blockedId) => blockedId !== otherId,
      );
    }

    await this.userRepository.save(firstUser);

    return {
      statusCode: 200,
      message: 'User updated successfully.',
    };
  }
}
