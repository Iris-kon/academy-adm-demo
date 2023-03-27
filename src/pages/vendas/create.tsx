import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react"
import Link from "next/link"
import { Input } from "../../components/Form/Input"
import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { fakeApi } from "../../services/fakeApi"
import { queryClient } from "../../services/queryClient"
import { useRouter } from "next/router"
import { useState } from "react"

type CreateSaleFormData = {
  date: string
  total: string
}

const createSaleFormSchema = yup.object({
  date: yup.string().required("Nome obrigatório"),
  total: yup.number().required("Total obrigatório"),
})

const productsInit = [
  {
    name: "Camisa A",
    price: 60,
    quantity: 0,
  },
  {
    name: "Bone A",
    price: 30,
    quantity: 0,
  },
  {
    name: "Bone B",
    price: 25,
    quantity: 0,
  },
]

export default function CreateSale() {
  const router = useRouter()
  const [total, setTotal] = useState(0)
  const [products, setProducts] = useState(productsInit)

  function onQntChange(index: number, qnt: number) {
    const newProducts = products

    newProducts[index].quantity = qnt

    setProducts(newProducts)

    const newTotal = newProducts
      .map((p) => p.price * p.quantity)
      .reduce((a, b) => a + b)

    setTotal(newTotal)
  }

  /*const createSale = useMutation(
    async (sale: CreateSaleFormData) => {
      const response = await fakeApi.post("sales", {
        sale: {
          ...sale,
          created_at: new Date(),
        },
      })

      return response.data.sale
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("sales")
      },
    }
  )*/

  const { register, handleSubmit, formState } = useForm<CreateSaleFormData>({
    resolver: yupResolver(createSaleFormSchema),
  })

  const { errors } = formState

  const handleCreateSale: SubmitHandler<CreateSaleFormData> = async (
    values
  ) => {
    //    await createSale.mutateAsync(values)

    router.push("/venda")
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateSale)}
        >
          <Heading size="lg" fontWeight="normal">
            Fazer Venda
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid columns={3} spacing={["3", "8"]} w="100%">
              {products.map((p, i) => (
                <>
                  <Input
                    name="Product"
                    type="text"
                    label="Produto"
                    value={p.name}
                    isDisabled
                  />
                  <Input
                    name="total"
                    type="number"
                    label="Quantidade"
                    onChange={(e) => onQntChange(i, Number(e.target.value))}
                    value={p.quantity}
                  />
                  <Input
                    name="subtotal"
                    type="number"
                    label="sub total"
                    value={p.quantity * p.price}
                    error={errors.total}
                    isDisabled
                  />
                </>
              ))}
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="total"
                type="number"
                label="Total"
                value={total}
                error={errors.total}
                isDisabled
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/produtos" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
