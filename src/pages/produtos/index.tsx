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
import NextLink from "next/link"
import { useState } from "react"
import { RiAddLine, RiPencilLine } from "react-icons/ri"
import { Header } from "../../components/Header"
import { Pagination } from "../../components/Pagination"
import { Sidebar } from "../../components/Sidebar"
import { fakeApi } from "../../services/fakeApi"
//import { getProducts, useProducts } from "../../services/hooks/useProducts"
import { queryClient } from "../../services/queryClient"

export default function ProductList({ products }) {
  const [page, setPage] = useState(1)
  const isLoading = false
  const isFetching = false
  const error = false

  const data = {
    products: [
      {
        id: 1,
        name: "Camiseta A",
        price: "R$: 60,00",
        stock: "50",
        createdAt: "12/12/2022",
      },
      {
        id: 2,
        name: "Bone A",
        price: "R$: 30,00",
        stock: "50",
        createdAt: "12/12/2022",
      },
    ],
    totalCount: 2,
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  /* use whe using react query
     const { data, isLoading, isFetching, error } = useProducts(page, {
       initialData: products,
     })

    async function handlePrefetchProduct(productId: string) {
        await queryClient.prefetchQuery(['product', productId], async () => {
            const response = await fakeApi.get(`products/${productId}`)

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
              Produtos
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <NextLink href="/produtos/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
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
                    <Th>Produto</Th>
                    <Th>Preço</Th>
                    <Th>Estoque</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data.products.map((product) => (
                    <Tr key={product.id}>
                      <Td px={["4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400">
                            <Text fontWeight="bold">{product.name}</Text>
                          </Link>
                        </Box>
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400">
                            <Text fontWeight="bold">{product.price}</Text>
                          </Link>
                        </Box>
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400">
                            <Text fontWeight="bold">{product.stock}</Text>
                          </Link>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{product.createdAt}</Td>}
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
  const { products, totalCount } = await getProducts(1)

  return {
    props: {
      products,
      totalCount,
    },
  }
}
*/
