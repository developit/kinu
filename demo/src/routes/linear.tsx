import {Button, Card, Input, Select, Textarea} from 'pui';
import {useState} from 'preact/hooks';

interface Comment {
  id: number;
  text: string;
}

type Status = 'Backlog' | 'In Progress' | 'Done';

interface Issue {
  id: number;
  title: string;
  status: Status;
  description: string;
  comments: Comment[];
}

const initialIssues: Issue[] = [
  {
    id: 1,
    title: 'Implement authentication',
    status: 'Backlog',
    description: 'Allow users to sign in',
    comments: [],
  },
  {
    id: 2,
    title: 'Fix navigation bug',
    status: 'In Progress',
    description: 'Sidebar does not collapse',
    comments: [],
  },
  {
    id: 3,
    title: 'Dark mode',
    status: 'Done',
    description: 'Add theme switcher',
    comments: [],
  },
];

const statuses: Status[] = ['Backlog', 'In Progress', 'Done'];

export default function Linear() {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [selectedId, setSelectedId] = useState(issues[0].id);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const selected = issues.find(i => i.id === selectedId)!;

  function updateIssue(id: number, update: Partial<Issue>) {
    setIssues(issues.map(i => (i.id === id ? {...i, ...update} : i)));
  }

  function addIssue() {
    if (!title) return;
    const id = Date.now();
    setIssues([
      ...issues,
      {id, title, status: 'Backlog', description: '', comments: []},
    ]);
    setTitle('');
    setSelectedId(id);
  }

  function addComment() {
    if (!comment) return;
    updateIssue(selectedId, {
      comments: [...selected.comments, {id: Date.now(), text: comment}],
    });
    setComment('');
  }

  return (
    <div class="linear-app">
      <aside class="linear-sidebar">
        <h2 style="margin:0">Linear</h2>
        <nav>
          <a href="#">Inbox</a>
          <a href="#">My Issues</a>
          <a href="#">Projects</a>
        </nav>
        <div class="linear-add">
          <Input
            value={title}
            onInput={e => setTitle((e.target as HTMLInputElement).value)}
            placeholder="New issue"
          />
          <Button onClick={addIssue}>Add</Button>
        </div>
      </aside>
      <main class="linear-board">
        {statuses.map(status => (
          <div class="linear-column">
            <h3>{status}</h3>
            {issues
              .filter(i => i.status === status)
              .map(issue => (
                <Card
                  key={issue.id}
                  class={
                    'linear-issue' + (issue.id === selectedId ? ' is-active' : '')
                  }
                  onClick={() => setSelectedId(issue.id)}
                >
                  <h4>{issue.title}</h4>
                </Card>
              ))}
          </div>
        ))}
      </main>
      <section class="linear-details">
        <h3 style="margin-top:0">{selected.title}</h3>
        <Select
          value={selected.status}
          onInput={e =>
            updateIssue(selected.id, {
              status: (e.target as HTMLSelectElement).value as Status,
            })
          }
        >
          {statuses.map(s => (
            <option value={s}>{s}</option>
          ))}
        </Select>
        <Textarea
          value={selected.description}
          placeholder="Describe the issue..."
          onInput={e =>
            updateIssue(selected.id, {
              description: (e.target as HTMLTextAreaElement).value,
            })
          }
        />
        <ul class="linear-comments">
          {selected.comments.map(c => (
            <li key={c.id}>{c.text}</li>
          ))}
        </ul>
        <div class="linear-add-comment">
          <Input
            value={comment}
            onInput={e => setComment((e.target as HTMLInputElement).value)}
            placeholder="Add comment"
          />
          <Button onClick={addComment}>Send</Button>
        </div>
      </section>
    </div>
  );
}
