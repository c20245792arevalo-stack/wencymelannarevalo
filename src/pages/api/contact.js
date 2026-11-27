import { Resend } from "resend";

export const prerender = false;

export async function POST({ request, redirect }) {
    const formData = await request.formData();

    if (formData.get("website")) {
        return redirect("/thanks", 303);
    }

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (
        !name ||
        !emailLooksValid ||
        !message ||
        name.length > 100 ||
        message.length > 2000
    ) {
        return redirect("/error", 303);
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;

    if (!resendApiKey || !contactToEmail) {
        console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL in server environment");
        return redirect("/error", 303);
    }

    const resend = new Resend(resendApiKey);

    try {
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "Website Contact <onboarding@resend.dev>",
            to: [contactToEmail],
            replyTo: email,
            subject: `New website contact message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>`,
        });

        if (error) {
            console.error("Resend delivery error:", error);
            return redirect("/error", 303);
        }

        console.log("Contact email sent:", data?.id);
        return redirect("/thanks", 303);
    } catch (error) {
        console.error("Could not send contact email:", error);
        return redirect("/error", 303);
    }
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}