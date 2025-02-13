import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field({ description: 'User ID' })
  id?: string;
  @Field({ description: 'Login email' })
  email: string;
  @Field({ description: 'User is referred by' })
  ref: string;
  @Field({ description: 'User real name', nullable: true })
  realName?: string;
  @Field({ description: 'User display name' })
  displayName: string;
  @Field({ description: 'Mobile number', nullable: true })
  mobile?: string;
  @Field({ description: 'Wechat', nullable: true })
  wechat?: string;
  @Field({ description: 'QQ', nullable: true })
  qq?: string;
  @Field({ description: 'is Email Verified' })
  isEmailVerified: boolean;
  @Field({ description: 'Verification Token', nullable: true })
  verificationToken?: string;
  @Field({ description: 'Reset Password Token', nullable: true })
  resetPasswordToken?: string;
}
