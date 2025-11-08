import { Column } from 'typeorm';

export class UserEntity {
  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 500, nullable: true })
  avatarUrl: string;

  @Column({ length: 255 })
  fullName: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'date' })
  birthdate: Date;
}
