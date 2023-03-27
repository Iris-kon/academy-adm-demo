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
import { Select } from "../../components/Form/Select"

type CreateWorkoutFormData = {
  name: string
  date: string
  local: string
  instructor: string
}

const createWorkoutFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  local: yup.string().required("local é obrigatório"),
  date: yup.date().required("Data é obrigatória"),
  instructor: yup.string().required("Instrutor é obrigatório"),
})

const instructors = [
  {
    label: "Fulano",
    value: "fulano",
  },
  {
    label: "Ciclano",
    value: "ciclano",
  },
]

const locals = [
  {
    label: "Sala A",
    value: "Sala A",
  },
  {
    label: "Sala B",
    value: "Sala B",
  },
]

export default function CreateWorkout() {
  const router = useRouter()

  /*const createWorkout = useMutation(
    async (workout: CreateWorkoutFormData) => {
      const response = await fakeApi.post("workouts", {
        workout: {
          ...workout,
          created_at: new Date(),
        },
      })

      return response.data.workout
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("workouts")
      },
    }
  )*/

  const { register, handleSubmit, formState } = useForm<CreateWorkoutFormData>({
    resolver: yupResolver(createWorkoutFormSchema),
  })

  const { errors } = formState

  const handleCreateWorkout: SubmitHandler<CreateWorkoutFormData> = async (
    values
  ) => {
    //    await createWorkout.mutateAsync(values)

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
          onSubmit={handleSubmit(handleCreateWorkout)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar Treino
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
              <Select
                name="Intructor"
                label="Instutor"
                options={instructors}
                error={errors.instructor}
                {...register("instructor")}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="date"
                type="datetime-local"
                label="Data"
                error={errors.date}
                {...register("date")}
              />
              <Select
                name="Local"
                label="Local"
                options={locals}
                error={errors.local}
                {...register("local")}
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
