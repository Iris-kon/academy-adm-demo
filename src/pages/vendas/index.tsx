import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import NextLink from "next/Link"
import { useState } from "react"
import { RiAddLine, RiPencilLine } from "react-icons/ri"
import { Header } from "../../components/Header"
import { Pagination } from "../../components/Pagination"
import { Sidebar } from "../../components/Sidebar"
import { fakeApi } from "../../services/fakeApi"
//import { getSales, useSales } from "../../services/hooks/useSales"
import { queryClient } from "../../services/queryClient"

export default function SaleList({ sales }) {
  const [page, setPage] = useState(1)
  const isLoading = false
  const isFetching = false
  const error = false

  const data = {
    sales: [
      {
        id: 1,
        total: "R$: 60,00",
        products: ["Camisa A"],
        createdAt: "23/03/2023",
      },
      {
        id: 2,
        total: "R$: 90,00",
        products: ["Camisa A, Bone A"],
        createdAt: "23/03/2023",
      },
    ],
    totalCount: 2,
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  /* use whe using react query
     const { data, isLoading, isFetching, error } = useSales(page, {
       initialData: sales,
     })

    async function handlePrefetchSale(saleId: string) {
        await queryClient.prefetchQuery(['sale', saleId], async () => {
            const response = await fakeApi.get(`sales/${saleId}`)

            return response.data
        }, {
            staleTime: 1000 * 60 * 10 //10 minutes
        })
    } */

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Vendas
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <NextLink href="/vendas/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Fazer venda
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falhar ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Produtos</Th>
                    <Th>Total</Th>
                    {isWideVersion && <Th>Data da Venda</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data.sales.map((sale) => (
                    <Tr key={sale.id}>
                      <Td px={["4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400">
                            <Text fontWeight="bold">{sale.products}</Text>
                          </Link>
                        </Box>
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400">
                            <Text fontWeight="bold">{sale.total}</Text>
                          </Link>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{sale.createdAt}</Td>}
                      {isWideVersion && (
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="small"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            Editar
                          </Button>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
/*
export const getServerSideProps: GetServerSideProps = async () => {
  const { sales, totalCount } = await getSales(1)

  return {
    props: {
      sales,
      totalCount,
    },
  }
}
*/
