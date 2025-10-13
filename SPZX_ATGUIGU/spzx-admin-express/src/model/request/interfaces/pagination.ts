/**
 * 分页参数接口
 * 作为参数传入查询方法，如果不传入则查询全部，传入则分页查询。
 */
export interface ByPage {
    pageNum: number; // 当前页码
    pageSize: number; // 每页显示数量
}