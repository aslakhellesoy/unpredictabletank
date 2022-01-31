import { Link } from "remix";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Unpredictable Tank</h1>
      <ul>
        <li>
          <Link to='/squads'>Squads</Link>
        </li>
      </ul>
    </div>
  );
}
