import * as z from "zod";

const productSchema = z.object({
	title: z.string().min(6, { message: "Title ít nhất 6 ký tự" }),
	price: z.number().min(0, { message: "Price không được để âm" }),
	description: z.string().min(1, { message: "Không được bỏ trống dữ liệu" }),
	thumbnail: z.string().min(1, { message: "Không được bỏ trống dữ liệu" }),
	brand: z.string().min(1, { message: "Không được bỏ trống dữ liệu" }),
});
export default productSchema;