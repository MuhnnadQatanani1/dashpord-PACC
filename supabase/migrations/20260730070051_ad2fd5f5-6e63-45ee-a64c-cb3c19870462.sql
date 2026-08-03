CREATE TABLE public.datasets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  updated date NOT NULL,
  format text NOT NULL CHECK (format IN ('CSV', 'XLSX', 'JSON')),
  rows integer NOT NULL DEFAULT 0,
  file_url text,
  original_filename text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.data_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  summary text NOT NULL,
  headline text NOT NULL,
  headline_label text NOT NULL,
  series jsonb NOT NULL DEFAULT '[]'::jsonb,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.datasets TO anon;
GRANT SELECT ON public.datasets TO authenticated;
GRANT ALL ON public.datasets TO service_role;

GRANT SELECT ON public.data_stories TO anon;
GRANT SELECT ON public.data_stories TO authenticated;
GRANT ALL ON public.data_stories TO service_role;

ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read datasets"
  ON public.datasets
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read data stories"
  ON public.data_stories
  FOR SELECT
  TO anon, authenticated
  USING (true);