CREATE TABLE `coyotendance`.`courses` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `name` VARCHAR(100) NOT NULL , `prof_id` INT(11) NULL , `location` VARCHAR(100) NULL , `timings` VARCHAR(200) NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `coyotendance`.`users` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `is_prof` BOOLEAN NOT NULL , `full_name` VARCHAR(200) NOT NULL , `email` VARCHAR(200) NOT NULL , `password` VARCHAR(200) NOT NULL , `thumbnail` VARCHAR(200) NULL , PRIMARY KEY (`id`), INDEX `is_professor` (`is_prof`)) ENGINE = InnoDB;

CREATE TABLE `coyotendance`.`student_courses` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `user_id` INT(11) NOT NULL , `course_id` INT(11) NOT NULL , PRIMARY KEY (`id`), INDEX `user_id` (`user_id`), INDEX `course_id` (`course_id`)) ENGINE = InnoDB;

CREATE TABLE `coyotendance`.`student_attendance` ( `user_id` INT(11) NOT NULL , `course_id` INT(11) NOT NULL , `time` INT(11) NOT NULL , INDEX `user_id` (`user_id`), INDEX `course_id` (`course_id`)) ENGINE = InnoDB;

