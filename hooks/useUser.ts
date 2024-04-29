import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export function useUser() {
	const supabase = createClient();

	const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

	useEffect(() => {
    supabase.auth.getSession()
      .then((res) => setUser(res.data.session?.user))
      .finally(() => setLoading(false));
  }, []);

	return { user, setUser, loading };
}
