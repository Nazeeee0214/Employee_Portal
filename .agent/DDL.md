# Payroll System DDL

## payroll_run_employee
```sql
CREATE TABLE `payroll_run_employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `employee_name` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `position` varchar(120) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `department_name` varchar(120) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `position_name` varchar(120) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `department_name_snapshot` varchar(120) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payroll_run_id` bigint unsigned NOT NULL,
  `cutoff_start` date NOT NULL,
  `cutoff_end` date NOT NULL,
  `cutoff_label` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `daily_rate` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cutoff_type` enum('FIRST','SECOND') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cutoff_id` int DEFAULT NULL,
  `basic_daily_rate` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hourly_rate` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `monthly_rate` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total_days_worked` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total_work_minutes` int NOT NULL DEFAULT '0',
  `late_minutes` int NOT NULL DEFAULT '0',
  `undertime_minutes` int NOT NULL DEFAULT '0',
  `overtime_minutes` int NOT NULL DEFAULT '0',
  `night_diff_minutes` int NOT NULL DEFAULT '0',
  `total_hours_worked` decimal(10,2) NOT NULL DEFAULT '0.00',
  `basic_pay` decimal(10,2) NOT NULL DEFAULT '0.00',
  `ot_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `leave_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `retro_pay` decimal(10,2) NOT NULL DEFAULT '0.00',
  `retro_remarks` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `holiday` decimal(10,2) NOT NULL DEFAULT '0.00',
  `holiday_pay` decimal(12,2) NOT NULL DEFAULT '0.00',
  `holiday_days` decimal(10,2) NOT NULL DEFAULT '0.00',
  `rest_day_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `night_diff_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `allowance` decimal(10,2) NOT NULL DEFAULT '0.00',
  `manual_additions` decimal(10,2) NOT NULL DEFAULT '0.00',
  `late_deduction` decimal(10,2) NOT NULL DEFAULT '0.00',
  `undertime_deduction` decimal(10,2) NOT NULL DEFAULT '0.00',
  `shortage_deduction` decimal(10,2) NOT NULL DEFAULT '0.00',
  `benefit_pagibig` decimal(10,2) NOT NULL DEFAULT '0.00',
  `loan_vale` decimal(10,2) NOT NULL DEFAULT '0.00',
  `loan_car` decimal(10,2) NOT NULL DEFAULT '0.00',
  `loan_coop?` decimal(10,2) NOT NULL DEFAULT '0.00',
  `loan_total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `benefit_philhealth` decimal(10,2) NOT NULL DEFAULT '0.00',
  `benefit_sss` decimal(10,2) NOT NULL DEFAULT '0.00',
  `benefit_loan_sss` decimal(10,2) NOT NULL DEFAULT '0.00',
  `benefit_loan_pagibig` decimal(10,2) NOT NULL DEFAULT '0.00',
  `benefit_loan_total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `coop_savings` decimal(10,2) NOT NULL DEFAULT '0.00',
  `coop_loan` decimal(10,2) NOT NULL DEFAULT '0.00',
  `dr_deduction` decimal(10,2) NOT NULL DEFAULT '0.00',
  `other_deductions` decimal(10,2) NOT NULL DEFAULT '0.00',
  `manual_deductions` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total_additions` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total_deductions` decimal(10,2) NOT NULL DEFAULT '0.00',
  `gross_pay` decimal(10,2) NOT NULL DEFAULT '0.00',
  `net_pay` decimal(10,2) DEFAULT '0.00',
  `is_prorated` tinyint(1) NOT NULL DEFAULT '0',
  `proration_json` json DEFAULT NULL,
  `breakdown_json` json DEFAULT NULL,
  `previous_net_pay` decimal(12,2) NOT NULL DEFAULT '0.00',
  `variance_amount_ui` decimal(12,2) NOT NULL DEFAULT '0.00',
  `variance_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `variance_pct` decimal(9,4) NOT NULL DEFAULT '0.0000',
  `variance_flag` tinyint(1) NOT NULL DEFAULT '0',
  `on_hold` tinyint(1) NOT NULL DEFAULT '0',
  `is_card` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_run_employee` (`payroll_run_id`,`user_id`),
  KEY `idx_pre_payroll_run_id` (`payroll_run_id`),
  KEY `idx_run_employee_lookup` (`payroll_run_id`,`user_id`),
  KEY `idx_payroll_run_employee_user_id` (`user_id`),
  CONSTRAINT `fk_payroll_run_employee_run` FOREIGN KEY (`payroll_run_id`) REFERENCES `payroll_run` (`payroll_run_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_payroll_run_employee_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=750 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

## leave_request
```sql
CREATE TABLE `leave_request` (
	`leave_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`department_id` INT NULL DEFAULT NULL,
	`leave_type` ENUM('vacation','sick','emergency','special','unpaid','others') NOT NULL DEFAULT 'vacation' COLLATE 'utf8mb4_0900_ai_ci',
	`leave_start` DATE NULL DEFAULT NULL,
	`leave_end` DATE NULL DEFAULT NULL,
	`total_days` DECIMAL(5,2) NOT NULL DEFAULT '0.00',
	`reason` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`remarks` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`override_attatchment_uuid` VARCHAR(36) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`status` ENUM('pending','approved','rejected','cancelled') NOT NULL DEFAULT 'pending' COLLATE 'utf8mb4_0900_ai_ci',
	`current_approval_level` INT NULL DEFAULT '1',
	`approver_id` INT NULL DEFAULT NULL,
	`approved_at` DATETIME NULL DEFAULT NULL,
	`filed_at` DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`emp_attatchment_uuid` VARCHAR(36) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`leave_id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=22
;
```

## overtime_request
```sql
CREATE TABLE `overtime_request` (
	`overtime_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`department_id` INT NULL DEFAULT NULL,
	`log_id` BIGINT UNSIGNED NULL DEFAULT NULL,
	`request_date` DATE NOT NULL,
	`sched_timeout` TIME NOT NULL,
	`ot_from` TIME NOT NULL,
	`ot_to` TIME NOT NULL,
	`duration_minutes` INT NOT NULL DEFAULT '0',
	`purpose` TEXT NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`attachment_uuid` VARCHAR(36) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`remarks` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`status` ENUM('pending','approved','rejected','cancelled') NOT NULL DEFAULT 'pending' COLLATE 'utf8mb4_0900_ai_ci',
	`current_approval_level` INT NULL DEFAULT '1',
	`approver_id` INT NULL DEFAULT NULL,
	`approved_at` DATETIME NULL DEFAULT NULL,
	`filed_at` DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`emp_attatchment_uuid` VARCHAR(36) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`overtime_id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=35
;
```

## undertime_request
```sql
CREATE TABLE `undertime_request` (
	`undertime_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`department_id` INT NULL DEFAULT NULL,
	`log_id` BIGINT UNSIGNED NULL DEFAULT NULL COMMENT 'Link to the attendance log entry',
	`request_date` DATE NOT NULL,
	`sched_timeout` TIME NOT NULL COMMENT 'The time the user was supposed to leave',
	`actual_timeout` TIME NOT NULL COMMENT 'The time the user is requesting to leave early',
	`duration_minutes` INT NOT NULL DEFAULT '0' COMMENT 'Minutes between actual_timeout and sched_timeout',
	`reason` TEXT NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`remarks` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`attachment_uuid` VARCHAR(36) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`status` ENUM('pending','approved','rejected','cancelled') NOT NULL DEFAULT 'pending' COLLATE 'utf8mb4_0900_ai_ci',
	`current_approval_level` INT NULL DEFAULT '1',
	`approver_id` INT NULL DEFAULT NULL,
	`approved_at` DATETIME NULL DEFAULT NULL,
	`filed_at` DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` INT NULL DEFAULT NULL,
	`updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
	`updated_by` INT NULL DEFAULT NULL,
	`emp_attatchment_uuid` VARCHAR(36) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`undertime_id`) USING BTREE,
	INDEX `fk_undertime_user` (`user_id`) USING BTREE,
	INDEX `fk_undertime_approver` (`approver_id`) USING BTREE,
	INDEX `idx_undertime_created_by` (`created_by`) USING BTREE,
	INDEX `fk_undertime_updater` (`updated_by`) USING BTREE,
	CONSTRAINT `fk_undertime_creator` FOREIGN KEY (`created_by`) REFERENCES `user` (`user_id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `fk_undertime_updater` FOREIGN KEY (`updated_by`) REFERENCES `user` (`user_id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=8
;
```

## department
```sql
CREATE TABLE `department` (
	`department_id` INT NOT NULL AUTO_INCREMENT,
	`department_name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`parent_division` INT NOT NULL DEFAULT '0',
	`department_description` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`department_head` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`department_head_id` INT NULL DEFAULT NULL,
	`tax_id` INT NULL DEFAULT NULL,
	`date_added` DATE NULL DEFAULT NULL,
	PRIMARY KEY (`department_id`) USING BTREE,
	UNIQUE INDEX `department_name` (`department_name`) USING BTREE,
	INDEX `idx_department_department_head_id` (`department_head_id`) USING BTREE,
	CONSTRAINT `fk_department_department_head_user` FOREIGN KEY (`department_head_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE ON DELETE SET NULL
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=29
;
```

## oncall_list
```sql
CREATE TABLE `oncall_list` (
	`id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`dept_sched_id` BIGINT UNSIGNED NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `idx_oncall_dept_sched_id` (`dept_sched_id`) USING BTREE,
	INDEX `idx_oncall_user_id` (`user_id`) USING BTREE,
	CONSTRAINT `fk_oncalllist_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=93
;
```

## department_schedule
```sql
CREATE TABLE `department_schedule` (
	`schedule_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`department_id` INT NOT NULL DEFAULT '0',
	`working_days` TINYINT UNSIGNED NOT NULL,
	`work_start` TIME NOT NULL,
	`work_end` TIME NOT NULL,
	`lunch_start` TIME NOT NULL DEFAULT '12:00:00',
	`lunch_end` TIME NOT NULL DEFAULT '13:00:00',
	`break_start` TIME NOT NULL DEFAULT '15:00:00',
	`break_end` TIME NOT NULL DEFAULT '15:30:00',
	`workdays_note` VARCHAR(64) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`grace_period` TINYINT UNSIGNED NOT NULL DEFAULT '5',
	`created_at` DATETIME NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`schedule_id`) USING BTREE,
	UNIQUE INDEX `uq_department_schedule` (`department_id`) USING BTREE,
	CONSTRAINT `FK_department_schedule_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=22
;
```
