import { createServiceClient } from "@/lib/supabase/server";

export default async function AdminMessagesPage() {
  const supabase = createServiceClient();
  let messages: Array<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    read: boolean;
    created_at: string;
  }> = [];

  if (supabase) {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    messages = data || [];
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl text-cd-ink">Contact Messages</h1>
        <p className="mt-1 text-sm text-cd-muted">
          Messages submitted from the contact page.
        </p>
      </div>

      {!supabase ? (
        <div className="rounded-2xl border border-dashed border-black/15 bg-white p-6 text-sm text-cd-muted">
          Configure Supabase to receive and store contact messages.
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/15 bg-white p-6 text-sm text-cd-muted">
          No messages yet.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <article
              key={m.id}
              className="rounded-2xl border border-black/5 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold text-cd-ink">{m.name}</h2>
                  <p className="text-sm text-cd-muted">
                    {m.email}
                    {m.phone ? ` · ${m.phone}` : ""}
                  </p>
                </div>
                <p className="text-xs text-cd-muted">
                  {new Date(m.created_at).toLocaleString()}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-cd-ink/80">
                {m.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
