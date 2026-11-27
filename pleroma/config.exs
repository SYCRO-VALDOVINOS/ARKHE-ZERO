import Config

config :pleroma, Pleroma.Web.Endpoint,
  url: [host: System.get_env("PLEROMA_DOMAIN"), scheme: "https", port: 443],
  secret_key_base: System.get_env("SECRET_KEY_BASE")

config :pleroma, :instance,
  name: "SYCRO VALDOVINOS - ARKHÉ-ZERO",
  description: "El legado no se hereda. Se firma. Nodo público de SYCRO VALDOVINOS, Toluca-Global, en el Fediverso.",
  email: System.get_env("ADMIN_EMAIL"),
  notify_email: System.get_env("ADMIN_EMAIL"),
  registrations_open: true,
  account_approval_required: true,
  invites_enabled: true
