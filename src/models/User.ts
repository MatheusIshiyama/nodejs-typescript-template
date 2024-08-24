import { hash, compare } from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ select: false, nullable: true })
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const salt: number = 10;
    if (this.password) this.password = await hash(this.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    const isEquals: boolean = await compare(password, this.password);

    return isEquals;
  }
}
