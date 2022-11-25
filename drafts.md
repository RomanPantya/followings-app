
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
