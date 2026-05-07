// ⚠️  ADICIONE ESTE ARQUIVO AO SEU .gitignore
// Nunca suba este arquivo para repositórios públicos (GitHub, GitLab, etc.)
//
// .gitignore:
//   supabase-config.js

const SUPABASE_CONFIG = {
  url: 'https://rgtnhkdfpsakimcfsgae.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndG5oa2RmcHNha2ltY2ZzZ2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODIxMzMsImV4cCI6MjA5MjI1ODEzM30.5LrAezH1QkjY_ZQNoHBRFyyqsYmnA8he25gdasaam6c'
};

// Cliente Supabase simples (sem SDK, funciona em HTML puro)
const supabase = {
  _headers() {
    return {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_CONFIG.anonKey,
      'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
    };
  },

  async insert(table, data) {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${table}`, {
      method: 'POST',
      headers: { ...this._headers(), 'Prefer': 'return=representation' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || JSON.stringify(json));
    return json;
  },

  async select(table, params = '') {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${table}?${params}`, {
      headers: this._headers()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || JSON.stringify(json));
    return json;
  },

  async update(table, data, match) {
    const query = Object.entries(match).map(([k, v]) => `${k}=eq.${v}`).join('&');
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${table}?${query}`, {
      method: 'PATCH',
      headers: { ...this._headers(), 'Prefer': 'return=representation' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || JSON.stringify(json));
    return json;
  },

  async delete(table, match) {
    const query = Object.entries(match).map(([k, v]) => `${k}=eq.${v}`).join('&');
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${table}?${query}`, {
      method: 'DELETE',
      headers: this._headers()
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.message || JSON.stringify(json));
    }
    return true;
  }
};
