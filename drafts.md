
```sql
--sql friends
select
	u.first_name, u.id, f.*, uf.*
from users as u
left join followings as f
on u.id = f.follower_id
inner join
	(select u.first_name, u.id, f.* from users as u
	left join followings as f
	on u.id = f.follower_id) as uf
on f.user_id = uf.follower_id and f.follower_id = uf.user_id
```

```sql
select
      first.id as userId,
      first.first_name as userName, second.id, second.first_name
  
    from 
    
    (select * from users
    right join followings
    on users.id = followings.follower_id) as first
    
    inner join
    
    (select * from users
    right join followings
    on users.id = followings.follower_id) as second
    
    on first.user_id = second.follower_id
    
    where first.follower_id = second.user_id
    
    
    order by userId
```
