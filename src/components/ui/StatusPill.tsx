import { Pill } from '@/components/ui/Pill';
import type { Project } from '@/types';

const LABEL: Record<NonNullable<Project['status']>, string> = {
  ongoing: 'Ongoing',
  'on-hold': 'On hold',
  shipped: 'Shipped',
  archived: 'Archived',
};

/** A project's status; only ongoing work gets the accent and the live dot. */
export function StatusPill({ status }: { status: NonNullable<Project['status']> }) {
  const live = status === 'ongoing';
  return (
    <Pill tone={live ? 'accent' : 'muted'} dot={live}>
      {LABEL[status]}
    </Pill>
  );
}
