import {Button, Card, Input, Select, Textarea} from 'pui';
import {useState} from 'preact/hooks';

interface Comment {
  id: number;
  text: string;
}

type Status = 'Backlog' | 'In Progress' | 'Review' | 'Done';
type Priority = 'Low' | 'Medium' | 'High';

interface Issue {
  id: number;
  title: string;
  status: Status;
  description: string;
  comments: Comment[];
  assignee: string;
  priority: Priority;
  labels: string[];
}

const users = ['Alice', 'Bob', 'Carol'];
const priorities: Priority[] = ['Low', 'Medium', 'High'];
const statuses: Status[] = ['Backlog', 'In Progress', 'Review', 'Done'];

const initialIssues: Issue[] = [
  {
    id: 1,
    title: 'Implement authentication',
    status: 'Backlog',
    description: 'Allow users to sign in',
    comments: [],
    assignee: 'Alice',
    priority: 'High',
    labels: ['auth'],
  },
  {
    id: 2,
    title: 'Fix navigation bug',
    status: 'In Progress',
    description: 'Sidebar does not collapse',
    comments: [],
    assignee: 'Bob',
    priority: 'Medium',
    labels: ['bug'],
  },
  {
    id: 3,
    title: 'Dark mode',
    status: 'Review',
    description: 'Add theme switcher',
    comments: [],
    assignee: 'Carol',
    priority: 'Low',
    labels: ['feature'],
  },
];

export default function Linear() {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [selectedId, setSelectedId] = useState(issues[0].id);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [query, setQuery] = useState('');

  const selected = issues.find(i => i.id === selectedId)!;

  function updateIssue(id: number, update: Partial<Issue>) {
    setIssues(issues.map(i => (i.id === id ? {...i, ...update} : i)));
  }

  function addIssue() {
    if (!title) return;
    const id = Date.now();
    setIssues([
      ...issues,
      {
        id,
        title,
        status: 'Backlog',
        description: '',
        comments: [],
        assignee: users[0],
        priority: 'Low',
        labels: [],
      },
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

  function deleteComment(id: number) {
    updateIssue(selectedId, {
      comments: selected.comments.filter(c => c.id !== id),
    });
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
        <Input
          value={query}
          onInput={e => setQuery((e.target as HTMLInputElement).value)}
          placeholder="Search issues"
        />
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
              .filter(
                i =>
                  i.status === status &&
                  i.title.toLowerCase().includes(query.toLowerCase())
              )
              .map(issue => (
                <Card
                  key={issue.id}
                  class={
                    'linear-issue' + (issue.id === selectedId ? ' is-active' : '')
                  }
                  onClick={() => setSelectedId(issue.id)}
                >
                  <h4>{issue.title}</h4>
                  <div class="linear-issue-meta">
                    <span class={'linear-priority ' + issue.priority.toLowerCase()}>
                      {issue.priority}
                    </span>
                    <span class="linear-assignee">{issue.assignee}</span>
                  </div>
                  {issue.labels.length ? (
                    <div class="linear-labels">
                      {issue.labels.map(l => (
                        <span>{l}</span>
                      ))}
                    </div>
                  ) : null}
                </Card>
              ))}
          </div>
        ))}
      </main>
      <section class="linear-details">
        <Input
          value={selected.title}
          onInput={e =>
            updateIssue(selected.id, {
              title: (e.target as HTMLInputElement).value,
            })
          }
        />
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
        <Select
          value={selected.assignee}
          onInput={e =>
            updateIssue(selected.id, {
              assignee: (e.target as HTMLSelectElement).value,
            })
          }
        >
          {users.map(u => (
            <option value={u}>{u}</option>
          ))}
        </Select>
        <Select
          value={selected.priority}
          onInput={e =>
            updateIssue(selected.id, {
              priority: (e.target as HTMLSelectElement).value as Priority,
            })
          }
        >
          {priorities.map(p => (
            <option value={p}>{p}</option>
          ))}
        </Select>
        <Input
          value={selected.labels.join(', ')}
          placeholder="labels"
          onInput={e =>
            updateIssue(selected.id, {
              labels: (e.target as HTMLInputElement).value
                .split(',')
                .map(s => s.trim())
                .filter(Boolean),
            })
          }
        />
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
            <li key={c.id}>
              <span>{c.text}</span>
              <Button onClick={() => deleteComment(c.id)}>×</Button>
            </li>
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
