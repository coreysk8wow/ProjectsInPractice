-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `brand` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`logo` varchar(255),
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `brand_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`image_url` varchar(200),
	`parent_id` bigint,
	`status` tinyint,
	`order_num` int,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `category_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `category_brand` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`brand_id` bigint,
	`category_id` bigint,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `category_brand_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `coupon_info` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`coupon_type` tinyint NOT NULL DEFAULT 1,
	`coupon_name` varchar(100),
	`amount` decimal(10,2) NOT NULL DEFAULT '0.00',
	`condition_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
	`start_time` date,
	`end_time` date,
	`range_type` tinyint NOT NULL DEFAULT 1,
	`range_desc` varchar(200),
	`publish_count` int NOT NULL DEFAULT 1,
	`per_limit` int NOT NULL DEFAULT 1,
	`use_count` int NOT NULL DEFAULT 0,
	`receive_count` int NOT NULL DEFAULT 0,
	`expire_time` datetime,
	`publish_status` tinyint(1),
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `coupon_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `coupon_range` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`coupon_id` bigint NOT NULL DEFAULT 0,
	`range_type` tinyint NOT NULL DEFAULT 1,
	`range_id` bigint NOT NULL DEFAULT 0,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `coupon_range_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `coupon_user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`coupon_id` bigint,
	`user_id` bigint,
	`order_id` bigint,
	`coupon_status` tinyint,
	`get_type` tinyint NOT NULL DEFAULT 2,
	`get_time` datetime,
	`using_time` datetime,
	`used_time` datetime,
	`expire_time` datetime,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `coupon_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_info` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL DEFAULT 0,
	`nick_name` varchar(200),
	`order_no` char(64) NOT NULL DEFAULT '',
	`coupon_id` bigint,
	`total_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
	`coupon_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
	`original_total_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
	`feight_fee` decimal(10,2) NOT NULL DEFAULT '0.00',
	`pay_type` tinyint,
	`order_status` tinyint NOT NULL DEFAULT 0,
	`receiver_name` varchar(100),
	`receiver_phone` varchar(32),
	`receiver_tag_name` varchar(32),
	`receiver_province` bigint,
	`receiver_city` bigint,
	`receiver_district` bigint,
	`receiver_address` varchar(200),
	`payment_time` datetime,
	`delivery_time` datetime,
	`receive_time` datetime,
	`remark` varchar(500),
	`cancel_time` datetime,
	`cancel_reason` varchar(255),
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `order_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_item` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`order_id` bigint,
	`sku_id` bigint,
	`sku_name` varchar(255),
	`thumb_img` varchar(500),
	`sku_price` decimal(10,2),
	`sku_num` int,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `order_item_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_log` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`order_id` bigint,
	`operate_user` varchar(100),
	`process_status` int,
	`note` varchar(500),
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `order_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_statistics` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`province_code` varchar(20),
	`order_date` date,
	`total_amount` decimal(10,2),
	`total_num` int,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `order_statistics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payment_info` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` bigint,
	`order_no` varchar(50) NOT NULL DEFAULT '',
	`pay_type` tinyint NOT NULL DEFAULT 0,
	`out_trade_no` varchar(50),
	`amount` decimal(10,2),
	`content` varchar(200),
	`payment_status` char(4),
	`callback_time` datetime,
	`callback_content` text,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `payment_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`brand_id` bigint,
	`category1_id` bigint,
	`category2_id` bigint,
	`category3_id` bigint,
	`unit_name` varchar(50),
	`slider_urls` text,
	`spec_value` varchar(255),
	`status` tinyint NOT NULL DEFAULT 0,
	`audit_status` tinyint NOT NULL DEFAULT 0,
	`audit_message` varchar(255),
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `product_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_attr` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`product_id` bigint,
	`attr_key` varchar(255),
	`attr_value` varchar(255),
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `product_attr_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_details` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`product_id` bigint,
	`image_urls` text,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `product_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_sku` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`sku_code` varchar(30),
	`sku_name` varchar(255),
	`product_id` bigint,
	`thumb_img` varchar(255),
	`sale_price` decimal(10,2),
	`market_price` decimal(10,2),
	`cost_price` decimal(10,2),
	`stock_num` int,
	`sale_num` int NOT NULL DEFAULT 0,
	`sku_spec` varchar(255) DEFAULT '',
	`weight` decimal(10,2),
	`volume` decimal(10,2),
	`status` tinyint,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `product_sku_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_spec` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`spec_name` varchar(100),
	`spec_value` text,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `product_spec_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_unit` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `product_unit_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `region` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`code` varchar(10),
	`parent_code` bigint,
	`name` varchar(20),
	`level` int,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `region_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_code` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `sys_login_log` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`username` varchar(50) DEFAULT '',
	`ipaddr` varchar(128) DEFAULT '',
	`status` tinyint(1) DEFAULT 0,
	`msg` varchar(255) DEFAULT '',
	`access_time` datetime,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`update_time` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `sys_login_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sys_menu` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`parent_id` bigint NOT NULL DEFAULT 0,
	`title` varchar(20) NOT NULL DEFAULT '',
	`component` varchar(100),
	`sort_value` int NOT NULL DEFAULT 1,
	`status` tinyint NOT NULL DEFAULT 1,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `sys_menu_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sys_oper_log` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`title` varchar(50) DEFAULT '',
	`method` varchar(100) DEFAULT '',
	`request_method` varchar(10) DEFAULT '',
	`operator_type` varchar(20) DEFAULT '0',
	`oper_name` varchar(50) DEFAULT '',
	`oper_url` varchar(255) DEFAULT '',
	`oper_ip` varchar(128) DEFAULT '',
	`oper_param` varchar(2000) DEFAULT '',
	`json_result` varchar(2000) DEFAULT '',
	`status` int DEFAULT 0,
	`error_msg` varchar(2000) DEFAULT '',
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`update_time` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `sys_oper_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sys_role` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`role_name` varchar(20) NOT NULL DEFAULT '',
	`role_code` varchar(20),
	`description` varchar(255),
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `sys_role_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sys_role_menu` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`role_id` bigint NOT NULL DEFAULT 0,
	`menu_id` bigint NOT NULL DEFAULT 0,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	`is_half` tinyint,
	CONSTRAINT `sys_role_menu_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sys_user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`username` varchar(20) NOT NULL DEFAULT '',
	`password` varchar(32) NOT NULL DEFAULT '',
	`name` varchar(50),
	`phone` varchar(11),
	`avatar` varchar(255),
	`description` varchar(255),
	`status` tinyint NOT NULL DEFAULT 1,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `sys_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sys_user_role` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`role_id` bigint NOT NULL DEFAULT 0,
	`user_id` bigint NOT NULL DEFAULT 0,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `sys_user_role_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_address` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL DEFAULT 0,
	`name` varchar(20) NOT NULL DEFAULT '',
	`phone` varchar(11) NOT NULL DEFAULT '',
	`tag_name` varchar(20),
	`province_code` varchar(20),
	`city_code` varchar(20),
	`district_code` varchar(20),
	`address` varchar(100) NOT NULL DEFAULT '',
	`full_address` varchar(500),
	`is_default` tinyint NOT NULL DEFAULT 1,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `user_address_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_browse_history` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`sku_id` bigint NOT NULL DEFAULT 0,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `user_browse_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_collect` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`sku_id` bigint NOT NULL DEFAULT 0,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `user_collect_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_info` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`username` varchar(50),
	`password` varchar(500),
	`nick_name` varchar(100),
	`phone` varchar(17),
	`avatar` varchar(200),
	`sex` tinyint(1),
	`memo` varchar(100),
	`open_id` varchar(45),
	`union_id` varchar(45),
	`last_login_ip` varchar(50),
	`last_login_time` datetime,
	`status` tinyint,
	`create_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`update_time` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`is_deleted` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `user_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `uniq_order_no` ON `payment_info` (`order_no`);--> statement-breakpoint
CREATE INDEX `idx_parent_id` ON `sys_menu` (`parent_id`);--> statement-breakpoint
CREATE INDEX `idx_role_id` ON `sys_role_menu` (`role_id`);--> statement-breakpoint
CREATE INDEX `idx_menu_id` ON `sys_role_menu` (`menu_id`);--> statement-breakpoint
CREATE INDEX `idx_role_id` ON `sys_user_role` (`role_id`);--> statement-breakpoint
CREATE INDEX `idx_admin_id` ON `sys_user_role` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_user_id` ON `user_browse_history` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_user_id` ON `user_collect` (`user_id`);
*/