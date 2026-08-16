CREATE TABLE public.kyc_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind text NOT NULL DEFAULT 'individual',
  tier_requested integer NOT NULL DEFAULT 1,
  id_type text NOT NULL,
  id_number text NOT NULL,
  document_url text,
  selfie_url text,
  business_name text,
  business_reg_number text,
  status text NOT NULL DEFAULT 'pending',
  risk_score integer NOT NULL DEFAULT 0,
  aml_flag boolean NOT NULL DEFAULT false,
  review_notes text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.kyc_submissions TO authenticated;
GRANT ALL ON public.kyc_submissions TO service_role;
ALTER TABLE public.kyc_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Own kyc read" ON public.kyc_submissions FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'ops'));
CREATE POLICY "Own kyc insert" ON public.kyc_submissions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER kyc_updated BEFORE UPDATE ON public.kyc_submissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE UNIQUE INDEX kyc_one_open_per_user ON public.kyc_submissions (user_id)
  WHERE status IN ('pending', 'approved');

CREATE TABLE public.tier_limits (
  tier integer PRIMARY KEY,
  label text NOT NULL,
  daily_limit_usd numeric NOT NULL,
  single_limit_usd numeric NOT NULL,
  requirements text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.tier_limits TO authenticated;
GRANT SELECT ON public.tier_limits TO anon;
GRANT ALL ON public.tier_limits TO service_role;
ALTER TABLE public.tier_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tier limits are public" ON public.tier_limits FOR SELECT USING (true);

INSERT INTO public.tier_limits (tier, label, daily_limit_usd, single_limit_usd, requirements) VALUES
  (0, 'Unverified', 100, 50, 'Email verified only'),
  (1, 'Tier 1', 2000, 500, 'BVN or NIN + phone number'),
  (2, 'Tier 2', 25000, 10000, 'Government ID upload + liveness selfie'),
  (3, 'Tier 3', 500000, 250000, 'Proof of address + source of funds (or business registration)');

CREATE TABLE public.audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  actor_email text,
  action text NOT NULL,
  target_type text,
  target_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.audit_events TO authenticated;
GRANT ALL ON public.audit_events TO service_role;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff read audit" ON public.audit_events FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'ops'));

CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "No direct account writes" ON public.accounts FOR ALL TO authenticated
  USING (false) WITH CHECK (false);
CREATE POLICY "No direct transaction writes" ON public.transactions FOR ALL TO authenticated
  USING (false) WITH CHECK (false);
CREATE POLICY "No direct wallet writes" ON public.wallets FOR ALL TO authenticated
  USING (false) WITH CHECK (false);
CREATE POLICY "No direct position writes" ON public.strategy_positions FOR ALL TO authenticated
  USING (false) WITH CHECK (false);