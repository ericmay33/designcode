import { LoadBalancerNode } from './nodes/LoadBalancerNode'
import { ApiServerNode } from './nodes/ApiServerNode'
import { SqlDatabaseNode } from './nodes/SqlDatabaseNode'
import { NoSqlDatabaseNode } from './nodes/NoSqlDatabaseNode'
import { CacheNode } from './nodes/CacheNode'
import { CdnNode } from './nodes/CdnNode'
import { MessageQueueNode } from './nodes/MessageQueueNode'
import { ObjectStorageNode } from './nodes/ObjectStorageNode'
import { ApiGatewayNode } from './nodes/ApiGatewayNode'
import { SearchIndexNode } from './nodes/SearchIndexNode'
import { DnsNode } from './nodes/DnsNode'
import { WafNode } from './nodes/WafNode'

export const NODE_TYPES = {
  loadBalancer: LoadBalancerNode,
  apiServer: ApiServerNode,
  sqlDatabase: SqlDatabaseNode,
  nosqlDatabase: NoSqlDatabaseNode,
  cache: CacheNode,
  cdn: CdnNode,
  messageQueue: MessageQueueNode,
  objectStorage: ObjectStorageNode,
  apiGateway: ApiGatewayNode,
  searchIndex: SearchIndexNode,
  dns: DnsNode,
  waf: WafNode,
} as const
