import json, hashlib, sys, pathlib
def canonicalize(v):
    if v is None or isinstance(v, bool): return json.dumps(v, separators=(',', ':'), ensure_ascii=False)
    if isinstance(v, (int, float)):
        if v == 0: return "0"
        return json.dumps(v, separators=(',', ':'), ensure_ascii=False)
    if isinstance(v, str): return json.dumps(v, separators=(',', ':'), ensure_ascii=False)
    if isinstance(v, list): return "[" + ",".join(canonicalize(x) for x in v) + "]"
    if isinstance(v, dict):
        return "{" + ",".join(json.dumps(k, ensure_ascii=False) + ":" + canonicalize(v[k]) for k in sorted(v.keys())) + "}"
    raise ValueError("Tipo no soportado")
def sha256_hex(b): return hashlib.sha256(b).hexdigest()
def verify(path):
    env = json.loads(pathlib.Path(path).read_text(encoding="utf-8"))
    errs = []
    if env.get("spec_version") != "arkhe-pcs/1.0": errs.append("spec_version invalido")
    if env.get("domain_separation") != "ARKHE-PCS-V1\n": errs.append("domain invalido")
    payload = env.get("payload", {}); sigs = env.get("signatures", {})
    gov = payload.get("governance", {})
    if gov.get("model") != "PCS-51-49" or gov.get("human_pct") != 51 or gov.get("ai_pct") != 49: errs.append("Gobernanza violada")
    canon = canonicalize(payload)
    if sha256_hex(canon.encode()) != sigs.get("canonical_payload_sha256"): errs.append("canonical_payload_sha256 mismatch - alterado")
    signing = ("ARKHE-PCS-V1\n" + canon).encode()
    if sha256_hex(signing) != sigs.get("signing_input_sha256"): errs.append("signing_input mismatch")
    try:
        from cryptography.hazmat.primitives import serialization
        import base64
        pub = serialization.load_der_public_key(base64.b64decode(sigs["ed25519"]["public_key_spki_base64"]))
        pub.verify(base64.b64decode(sigs["ed25519"]["signature_base64"]), signing)
        print("Ed25519: PASS")
    except Exception as e: errs.append(f"Ed25519 FAILED: {e}")
    print("ML-DSA-65: SKIP en Python sin oqs - verificar en JS")
    return errs
if __name__ == "__main__":
    for p in sys.argv[1:]:
        print(f"\n=== {p} ===")
        e = verify(p)
        print("RESULT:", "FAIL - RECHAZADO" if e else "PASS - VALIDO")
        for x in e: print(" -", x)
