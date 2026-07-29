interface OnlineUsersProps {
  users: string[];
}

export default function OnlineUsers({ users }: OnlineUsersProps) {
  return (
    <div className="h-full w-56 border-r border-gray-300 p-4 overflow-y-auto">
      <h2 className="text-sm font-semibold text-gray-500 mb-3">
        Online — {users.length}
      </h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user} className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
}
