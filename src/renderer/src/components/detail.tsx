import { useSubscriberStore } from '@renderer/store/subscriber'

export function RssDetail({ className }: { title?: string; className: string }): JSX.Element {
  const activeRSSItem = useSubscriberStore((state) => state.activeRSSItem)

  return activeRSSItem ? (
    <section
      className={`detail-page ${className}`}
      dangerouslySetInnerHTML={{ __html: activeRSSItem?.content ?? '' }}
    ></section>
  ) : (
    <></>
  )
}
