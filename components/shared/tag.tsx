import { Badge } from '../ui/badge'

function Tag({ title }: { title: string }) {
  return (
    <Badge className='rounded bg-gray-500'>
      {title}
    </Badge>
  )
}

export default Tag