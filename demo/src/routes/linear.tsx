import {
  Badge,
  Button,
  Card,
  Input,
  Select,
  Textarea,
  RadioGroup,
  Radio,
  Label,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Drawer,
  DrawerContent,
  Sidebar,
  DrawerClose,
} from 'kinu';
import {useState, useRef, useEffect} from 'preact/hooks';

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

function DetailsEditor({
  issue,
  updateIssue,
  addLabel,
  removeLabel,
  addComment,
  deleteComment,
}: {
  issue: Issue;
  updateIssue: (update: Partial<Issue>) => void;
  addLabel: (label: string) => void;
  removeLabel: (label: string) => void;
  addComment: (text: string) => void;
  deleteComment: (id: number) => void;
}) {
  const [label, setLabel] = useState('');
  const [comment, setComment] = useState('');
  return (
    <>
      <Input
        value={issue.title}
        onInput={(e) =>
          updateIssue({title: (e.target as HTMLInputElement).value})
        }
      />
      <RadioGroup>
        {statuses.map((status) => {
          const statusId = `status-${issue.id}-${status
            .toLowerCase()
            .replace(/\s+/g, '-')}`;
          return (
            <div class="linear-radio-option">
              <Radio
                id={statusId}
                name={`status-${issue.id}`}
                checked={issue.status === status}
                onInput={() => updateIssue({status})}
              />
              <Label htmlFor={statusId}>{status}</Label>
            </div>
          );
        })}
      </RadioGroup>
      <Select
        value={issue.assignee}
        onInput={(e) =>
          updateIssue({assignee: (e.target as HTMLSelectElement).value})
        }
      >
        {users.map((u) => (
          <option value={u}>{u}</option>
        ))}
      </Select>
      <RadioGroup>
        {priorities.map((priority) => {
          const priorityId = `priority-${issue.id}-${priority.toLowerCase()}`;
          return (
            <div class="linear-radio-option">
              <Radio
                id={priorityId}
                name={`priority-${issue.id}`}
                checked={issue.priority === priority}
                onInput={() => updateIssue({priority})}
              />
              <Label htmlFor={priorityId}>{priority}</Label>
            </div>
          );
        })}
      </RadioGroup>
      <div class="linear-tag-editor">
        {issue.labels.map((l) => (
          <Badge>
            {l}
            <Button
              style="margin:-.25em -.9em -.25em -.5em; padding:0 .75em; color:red; font-size:1.25em;"
              variant="ghost"
              size="sm"
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
            onInput={(e) => setLabel((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => {
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
        value={issue.description}
        placeholder="Describe the issue..."
        onInput={(e) =>
          updateIssue({
            description: (e.target as HTMLTextAreaElement).value,
          })
        }
      />
      <ul class="linear-comments">
        {issue.comments.map((c) => (
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
          onInput={(e) => setComment((e.target as HTMLInputElement).value)}
          placeholder="Add comment"
        />
        <Button
          onClick={() => {
            addComment(comment);
            setComment('');
          }}
        >
          Send
        </Button>
      </div>
    </>
  );
}

export default function Linear() {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [title, setTitle] = useState('');
  const [query, setQuery] = useState('');
  const drawerRef = useRef<HTMLDialogElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const m = matchMedia('(max-width: 800px)');
    const listener = () => setIsMobile(m.matches);
    listener();
    m.addEventListener('change', listener);
    return () => m.removeEventListener('change', listener);
  }, []);

  const selected = issues.find((i) => i.id === selectedId)!;

  function updateIssue(id: number, update: Partial<Issue>) {
    setIssues(issues.map((i) => (i.id === id ? {...i, ...update} : i)));
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

  function addComment(id: number, text: string) {
    if (!text) return;
    setIssues(
      issues.map((i) =>
        i.id === id
          ? {...i, comments: [...i.comments, {id: Date.now(), text}]}
          : i,
      ),
    );
  }

  function deleteComment(issueId: number, commentId: number) {
    setIssues(
      issues.map((i) =>
        i.id === issueId
          ? {...i, comments: i.comments.filter((c) => c.id !== commentId)}
          : i,
      ),
    );
  }

  function addLabel(id: number, l: string) {
    if (!l) return;
    setIssues(
      issues.map((i) => (i.id === id ? {...i, labels: [...i.labels, l]} : i)),
    );
  }

  function removeLabel(id: number, l: string) {
    setIssues(
      issues.map((i) =>
        i.id === id ? {...i, labels: i.labels.filter((x) => x !== l)} : i,
      ),
    );
  }

  return (
    <>
      <div class="linear-app">
        <Sidebar>
          <h1 style="margin:0;font-size:1.25rem;padding:.5rem;">Linear</h1>
          <nav class="linear-nav">
            <a href="/linear?view=inbox">Inbox</a>
            <a href="/linear?view=my-issues">My Issues</a>
            <a href="/linear?view=projects">Projects</a>
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
            onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
            placeholder="Search issues"
          />
          <div class="linear-add">
            <Input
              value={title}
              onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
              placeholder="New issue"
            />
            <Button size="sm" onClick={addIssue}>
              Add
            </Button>
          </div>
        </Sidebar>
        <main class="linear-board">
          {statuses.map((status) => (
            <div class="linear-column">
              <h3>{status}</h3>
              {issues
                .filter(
                  (i) =>
                    i.status === status &&
                    i.title.toLowerCase().includes(query.toLowerCase()),
                )
                .map((issue) => (
                  <Card
                    key={issue.id}
                    class={
                      'linear-issue' +
                      (issue.id === selectedId ? ' is-active' : '')
                    }
                    commandFor="linear-details-drawer"
                    command="show-modal"
                    onClick={() => {
                      setSelectedId(issue.id);
                      if (
                        isMobile &&
                        drawerRef.current &&
                        !drawerRef.current.open
                      ) {
                        // drawerRef.current.showModal();
                      }
                    }}
                  >
                    <h4>{issue.title}</h4>
                    <div class="linear-issue-meta">
                      <span
                        class={
                          'linear-priority ' + issue.priority.toLowerCase()
                        }
                      >
                        {issue.priority}
                      </span>
                      <span class="linear-assignee">{issue.assignee}</span>
                    </div>
                    {issue.labels.length ? (
                      <div class="linear-labels">
                        {issue.labels.map((l) => (
                          <span>{l}</span>
                        ))}
                      </div>
                    ) : null}
                  </Card>
                ))}
            </div>
          ))}
        </main>
        {!isMobile && selected && (
          <section class="linear-details linear-details-desktop">
            <header style="margin:-.75rem 0; display:flex; justify-content:end;">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedId(undefined)}
              >
                ✕
              </Button>
            </header>
            <DetailsEditor
              issue={selected}
              updateIssue={(u) => updateIssue(selected.id, u)}
              addLabel={(l) => addLabel(selected.id, l)}
              removeLabel={(l) => removeLabel(selected.id, l)}
              addComment={(t) => addComment(selected.id, t)}
              deleteComment={(id) => deleteComment(selected.id, id)}
            />
          </section>
        )}
      </div>
      {isMobile && selected && (
        <Drawer id="linear-details-drawer">
          <DrawerContent onClose={() => setSelectedId(undefined)}>
            <div class="linear-details-drawer">
              <DetailsEditor
                issue={selected}
                updateIssue={(u) => updateIssue(selected.id, u)}
                addLabel={(l) => addLabel(selected.id, l)}
                removeLabel={(l) => removeLabel(selected.id, l)}
                addComment={(t) => addComment(selected.id, t)}
                deleteComment={(id) => deleteComment(selected.id, id)}
              />
              <DrawerClose>
                <Button variant="outline" style="margin-top:1rem">
                  Close
                </Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
