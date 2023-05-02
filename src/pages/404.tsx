import Link from 'next/link'

import { STRINGS } from '@/strings'

import { SEO } from '../components/SEO'

import styles from '../styles/Custom404.module.scss'

const SEO_TITLE = STRINGS.APP_NAME
const BUTTON_BACK = STRINGS.GO_BACK

export default function Custom404() {
  return (
    <>
      <SEO title={SEO_TITLE} />

      <main className={`main mainError ${styles.custom404}`}>
        <h1>Ops! Não encontramos essa página</h1>
        <Link href="/">
          <a title={BUTTON_BACK}>{BUTTON_BACK}</a>
        </Link>
      </main>
    </>
  )
}
