import { IsEnum, IsIn } from 'class-validator';
import { UserEntity } from 'src/entities/user.entity';
import { OrderByEnum } from 'src/order-by.type';

const userKeys = ['id', 'email', 'first_name', 'gender']; // TODO

export class GetUserByIdQueryDto {
       @IsIn(userKeys)
       order_by: keyof UserEntity = 'id';

       @IsEnum(OrderByEnum)
       order_type: OrderByEnum = OrderByEnum.DESC;
}
