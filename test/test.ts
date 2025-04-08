import { rpc, rpcClient } from "../src"

const rpcDef = rpc()
  .route("/user", rpc()
    .get(res => res.union(
      res.json({
        success: true,
      }, 206),
      res.json({
        result: "name",
      }, 200))
    )
    .post(() => { })
  )
  .route("/chat", rpc()
    .post("/send-message", () => { }
    )
  )

type RpcType = typeof rpcDef

const client = rpcClient<RpcType>('http://localhost:3000')

{
  const res = await client.user.$get({

  })
  const data = await res.json()

}
{
  const res = await client.user.$post({

  })
}
{
  const res = await client.chat["send-message"].$post({

  })
}