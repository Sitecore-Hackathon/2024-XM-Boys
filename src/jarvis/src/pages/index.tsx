import { Icon, IconButton, Tooltip, Image } from '@chakra-ui/react';
import { CreateComponentForm } from '../components/CreateCompoentForm';
import styles from './page.module.css';

import { mdiDotsGrid, mdiWarehouse, mdiChevronRight, mdiDatabase, mdiInbox } from '@mdi/js';
import { useEffect } from 'react';

import { createRoot } from 'react-dom/client';

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Tooltip label="Switch to…">
            <IconButton
              variant="ghost"
              size="sm"
              icon={
                <Icon>
                  <path d={mdiDotsGrid} />
                </Icon>
              }
              aria-label={'Switch to…'}
              className="js-my-switcher-button"
            />
          </Tooltip>
          <div className={styles.headerLeftBredcrumbs}>
            <Tooltip label="Switch to…">
              <IconButton
                variant="ghost"
                size="sm"
                icon={
                  <Icon>
                    <path d={mdiWarehouse} />
                  </Icon>
                }
                aria-label={'Switch to…'}
                className="js-my-switcher-button"
              />
            </Tooltip>

            <Icon>
              <path d={mdiChevronRight} />
            </Icon>
            <Image
              className={styles.headerIcon}
              src="https://i.ibb.co/4ThMXGB/jarvis-Icon.webp"
              alt="icon"
            />
          </div>
        </div>
        <div className={styles.headerRight}>
          <Tooltip label="Project Name">
            <div className={styles.headerBadge}>
              <Icon>
                <path d={mdiInbox} />
              </Icon>
              <span>Jarvis</span>
            </div>
          </Tooltip>
          <Tooltip label="Environment">
            <div className={styles.headerBadge}>
              <Icon>
                <path d={mdiDatabase} />
              </Icon>
              <span>Dev</span>
            </div>
          </Tooltip>
        </div>
      </header>
      <main className={styles.main}>
        <CreateComponentForm />
      </main>
    </>
  );
}
