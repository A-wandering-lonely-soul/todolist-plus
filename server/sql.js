module.exports = {
	CREATED_TASK_GROUP: "INSERT INTO TASK_GROUP (title, date) VALUES('${title}', '${date}')",
	SELECT_TASK_GROUP:
		"select L.id, l.title, l.description, l.enclosure, l.`level`, l.date, G.TITLE AS g_title, G.id as group_id from TASK_GROUP G left join  TASK_LIST L  on  G.id =L.group_id",
	UPDATE_TASK_GROUP_TITLE: "UPDATE TASK_GROUP SET title='${title}' WHERE id=${id}",
	CREATED_TASK_LIST:
		"INSERT INTO TASK_LIST (title, description, enclosure, level, group_id, date) VALUES('${title}', '${description}', '${enclosure}', '${level}', '${group_id}', '${date}')",
	UPDATE_TASK_LIST:
		"UPDATE TASK_LIST  SET title = '${title}', description = '${description}', enclosure = '${enclosure}', level = ${level}, group_id = ${group_id}, date = '${date}' WHERE ID = ${id}",
	USER_LOGIN: "SELECT * FROM user where username = '${username}' and password = '${password}'",
	USER_REGISTER:
		"INSERT INTO user (username, password, ip, date) VALUES('${username}', '${password}', '${ip}', '${date}')",
	DELETE_TASK_LIST: "DELETE FROM TASK_LIST WHERE id=${id}",
	DELETE_TASK_GROUP: "DELETE FROM TASK_GROUP WHERE id=${id}",
	DELETE_TASK_LIST_BY_GROUPID: "DELETE FROM TASK_LIST WHERE group_id=${group_id}",
	SELECT_TASK_LIST_BY_ID: "SELECT * FROM TASK_LIST WHERE id=${id}",
};
