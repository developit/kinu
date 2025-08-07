import {
  Badge,
  Button,
  Card,
  Input,
  Select,
  Textarea,
  RadioGroup,
  Radio,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Drawer,
  DrawerContent,
  DrawerClose,
} from 'pui';
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
  const [label, setLabel] = useState('');

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

  function addLabel(l: string) {
    if (!l) return;
    updateIssue(selectedId, {labels: [...selected.labels, l]});
  }

  function removeLabel(l: string) {
    updateIssue(selectedId, {labels: selected.labels.filter(x => x !== l)});
  }

  function DetailsEditor() {
    return (
      <>
        <Input
          value={selected.title}
          onInput={e =>
            updateIssue(selected.id, {
              title: (e.target as HTMLInputElement).value,
            })
          }
        />
        <RadioGroup>
          {statuses.map(s => (
            <label>
              <Radio
                name={`status-${selected.id}`}
                checked={selected.status === s}
                onInput={() => updateIssue(selected.id, {status: s})}
              />
              {s}
            </label>
          ))}
        </RadioGroup>
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
        <RadioGroup>
          {priorities.map(p => (
            <label>
              <Radio
                name={`priority-${selected.id}`}
                checked={selected.priority === p}
                onInput={() => updateIssue(selected.id, {priority: p})}
              />
              {p}
            </label>
          ))}
        </RadioGroup>
        <div class="linear-tag-editor">
          {selected.labels.map(l => (
            <Badge>
              {l}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeLabel(l)}
              >
                ×
              </Button>
            </Badge>
          ))}
          <div class="linear-add-label">
            <Input
              value={label}
              placeholder="Add label"
              onInput={e => setLabel((e.target as HTMLInputElement).value)}
              onKeyDown={e => {
                if ((e as KeyboardEvent).key === 'Enter') {
                  addLabel(label.trim());
                  setLabel('');
                }
              }}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                addLabel(label.trim());
                setLabel('');
              }}
            >
              +
            </Button>
          </div>
        </div>
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteComment(c.id)}
              >
                ×
              </Button>
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
      </>
    );
  }

  return (
    <>
      <div class="linear-app">
        <aside class="linear-sidebar">
          <h2 style="margin:0">Linear</h2>
          <nav class="linear-nav">
            <a href="#">Inbox</a>
            <a href="#">My Issues</a>
          <a href="#">Projects</a>
        </nav>
        <div class="linear-mobile-menu">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Inbox</DropdownMenuItem>
              <DropdownMenuItem>My Issues</DropdownMenuItem>
              <DropdownMenuItem>Projects</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
                  onClick={() => {
                    setSelectedId(issue.id);
                    const dialog = document.getElementById(
                      'linear-mobile-details'
                    ) as HTMLDialogElement | null;
                    if (
                      matchMedia('(max-width: 800px)').matches &&
                      dialog &&
                      !dialog.open
                    ) {
                      dialog.showModal();
                    }
                  }}
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
      <section class="linear-details linear-details-desktop">
        <DetailsEditor />
      </section>
    </div>
    <Drawer id="linear-mobile-details">
      <DrawerContent class="linear-details-drawer">
        <DetailsEditor />
        <DrawerClose>
          <Button variant="outline" style="margin-top:1rem">Close</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
    </>
  );
}
