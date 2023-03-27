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

type CreateProductFormData = {
  name: string
  price: string
  stock: string
}

const createProductFormSchema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  price: yup.number().required("Preço obrigatório"),
  stock: yup.number().required("Quantia em estoque obrigatório"),
})

export default function CreateProduct() {
  const router = useRouter()

  /*const createProduct = useMutation(
    async (product: CreateProductFormData) => {
      const response = await fakeApi.post("products", {
        product: {
          ...product,
          created_at: new Date(),
        },
      })

      return response.data.product
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products")
      },
    }
  )*/

  const { register, handleSubmit, formState } = useForm<CreateProductFormData>({
    resolver: yupResolver(createProductFormSchema),
  })

  const { errors } = formState

  const handleCreateProduct: SubmitHandler<CreateProductFormData> = async (
    values
  ) => {
    //    await createProduct.mutateAsync(values)

    router.push("/produtos")
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
          onSubmit={handleSubmit(handleCreateProduct)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar Produto
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                type="text"
                label="Nome"
                error={errors.name}
                {...register("name")}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="price"
                type="number"
                label="Preço"
                error={errors.price}
                {...register("price")}
              />

              <Input
                name="stock"
                type="number"
                label="Quantia em estoque"
                error={errors.stock}
                {...register("stock")}
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
