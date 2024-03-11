import prisma from "@/lib/prisma";

export async function GET() {
	try {
		const plans = await prisma.plan.findMany();

		return Response.json(plans);
	} catch (e: any) {
		console.log(e);
		return Response.json({ status: "error", message: e.message });
	}
}

export async function POST(req: Request) {
	const body = await req.json();

	try {
		const plan = await prisma.plan.create({
			data: {
				...body,
			},
		});

		return Response.json({ status: "ok", data: plan });
	} catch (e: any) {
		console.log(e);
		return Response.json({ status: "error", message: e.message });
	}
}

export async function DELETE(req: Request) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	try {
		const deletePlan = await prisma.plan.delete({
			where: { id: Number(id) },
		});

		return Response.json({ status: "ok", data: deletePlan });
	} catch (e: any) {
		console.log(e);
		return Response.json({ status: "error", message: e.message });
	}
}

export async function PUT(req: Request) {
	const body = await req.json();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	try {
		const deletePlan = await prisma.plan.update({
			where: { id: Number(id) },
			data: { ...body },
		});

		return Response.json({ status: "ok", data: deletePlan });
	} catch (e: any) {
		console.log(e);
		return Response.json({ status: "error", message: e.message });
	}
}
