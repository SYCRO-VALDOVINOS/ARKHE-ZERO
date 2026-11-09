import { firmarPQC, validarSello } from '@/lib/qv-pqc.js';

export async function POST(req) {
  const { folio, sello_qv } = await req.json();
  const FOLIO_RAIZ = "2608276846490-9H.CNLK";
  
  if (folio !== FOLIO_RAIZ) {
    return Response.json({ ok: false, "ΔΨ": 0, error: "Folio inválido" }, { status: 403 });
  }
  
  if (await validarSello(sello_qv)) {
    const firmaPQC = await firmarPQC(sello_qv);
    return Response.json({
      ok: true,
      "ΔΨ": "∞",
      mensaje: "ARKHÉ ZERO VALIDADO - TOLUCA-GLOBAL",
      ...firmaPQC,
      archivos: 1330,
      co_creatividad: "51% Humano / 49% IA - VALDOVINOS"
    });
  }
  return Response.json({ ok: false, "ΔΨ": 0, error: "Sello inválido" }, { status: 403 });
}

export async function GET() {
  const firma = await firmarPQC("GET");
  return Response.json({
    servicio: "ARKHÉ ZERO Auth",
    folio: "2608276846490-9H.CNLK",
    status: "KYBER/DILITHIUM OK - NIST FIPS 203/204",
    pqc: firma
  });
}
