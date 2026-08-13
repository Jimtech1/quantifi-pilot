-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'ops', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Shared updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  phone text,
  country text NOT NULL DEFAULT 'Nigeria',
  kyc_status text NOT NULL DEFAULT 'unverified',
  kyc_tier integer NOT NULL DEFAULT 0,
  risk_tolerance text NOT NULL DEFAULT 'Balanced',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own profile read" ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Own profile write" ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Own profile insert" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Receivable accounts
CREATE TABLE public.accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  currency text NOT NULL CHECK (currency IN ('NGN','USD','GBP','EUR')),
  account_name text NOT NULL,
  account_number text,
  bank_name text,
  sort_code text,
  iban text,
  routing_number text,
  swift_code text,
  balance numeric(20,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, currency)
);
GRANT SELECT, INSERT, UPDATE ON public.accounts TO authenticated;
GRANT ALL ON public.accounts TO service_role;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own accounts read" ON public.accounts FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER accounts_updated BEFORE UPDATE ON public.accounts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Chain wallets (BNB Chain)
CREATE TABLE public.wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chain text NOT NULL DEFAULT 'BNB',
  address text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, chain)
);
GRANT SELECT ON public.wallets TO authenticated;
GRANT ALL ON public.wallets TO service_role;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own wallets read" ON public.wallets FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Beneficiaries
CREATE TABLE public.beneficiaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label text NOT NULL,
  kind text NOT NULL DEFAULT 'bank' CHECK (kind IN ('bank','crypto')),
  currency text,
  bank_name text,
  account_number text,
  wallet_address text,
  network text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.beneficiaries TO authenticated;
GRANT ALL ON public.beneficiaries TO service_role;
ALTER TABLE public.beneficiaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own beneficiaries" ON public.beneficiaries FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Transactions
CREATE TABLE public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id uuid REFERENCES public.accounts(id) ON DELETE SET NULL,
  direction text NOT NULL CHECK (direction IN ('credit','debit')),
  kind text NOT NULL,
  currency text NOT NULL,
  amount numeric(20,2) NOT NULL,
  fee numeric(20,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  reference text,
  counterparty text,
  chain_tx_hash text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.transactions TO authenticated;
GRANT ALL ON public.transactions TO service_role;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own transactions read" ON public.transactions FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Goals
CREATE TABLE public.goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  icon text NOT NULL DEFAULT '🎯',
  name text NOT NULL,
  target_amount numeric(20,2) NOT NULL,
  saved_amount numeric(20,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  strategy text NOT NULL DEFAULT 'SMART_SAVE',
  target_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.goals TO authenticated;
GRANT ALL ON public.goals TO service_role;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own goals" ON public.goals FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER goals_updated BEFORE UPDATE ON public.goals
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Strategy positions
CREATE TABLE public.strategy_positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  strategy text NOT NULL,
  amount numeric(20,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  projected_apy text,
  status text NOT NULL DEFAULT 'active',
  reference text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.strategy_positions TO authenticated;
GRANT ALL ON public.strategy_positions TO service_role;
ALTER TABLE public.strategy_positions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own positions read" ON public.strategy_positions FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER positions_updated BEFORE UPDATE ON public.strategy_positions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Signup bootstrap: profile, role, four receivable accounts, BNB wallet
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  suffix text := upper(substr(replace(NEW.id::text, '-', ''), 1, 10));
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)), NEW.email, NEW.raw_user_meta_data->>'phone')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.accounts (user_id, currency, account_name, account_number, bank_name, sort_code, iban, routing_number, swift_code)
  VALUES
    (NEW.id, 'NGN', 'NexaFi NGN Receivable', '30' || substr(suffix, 1, 8), 'NexaFi Partner Bank', NULL, NULL, NULL, NULL),
    (NEW.id, 'USD', 'NexaFi USD Receivable', '80' || substr(suffix, 2, 8), 'NexaFi Partner Bank USA', NULL, NULL, '0210' || substr(suffix, 1, 5), 'NEXAUS33'),
    (NEW.id, 'GBP', 'NexaFi GBP Receivable', substr(suffix, 3, 8), 'NexaFi Partner Bank UK', '04-' || substr(suffix, 1, 2) || '-' || substr(suffix, 3, 2), 'GB29NEXA' || substr(suffix, 1, 8) || '01', NULL, 'NEXAGB2L'),
    (NEW.id, 'EUR', 'NexaFi EUR Receivable', NULL, 'NexaFi Partner Bank EU', NULL, 'DE89NEXA' || substr(suffix, 1, 10) || '00', NULL, 'NEXADEFF')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.wallets (user_id, chain, address)
  VALUES (NEW.id, 'BNB', '0x' || substr(md5(NEW.id::text), 1, 40))
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();