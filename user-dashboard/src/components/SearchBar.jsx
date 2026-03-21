function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="🔍 Search by name or email..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full max-w-md border border-slate-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  );
}

export default SearchBar;