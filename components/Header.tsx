import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Welcome } from "./Welcome";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const [session, loading] = useSession();

  let right = null;

  if (loading) {
    right = (
      <div>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <Link href="/api/auth/signin">
        <Box
          data-active={isActive("/signup")}
          as="button"
          p="8px 10px"
          mt="25px"
          mr="10px"
          color="white"
          fontWeight="bold"
          borderRadius="md"
          bgGradient="linear(to-r, teal.500,green.500)"
          _hover={{
            bgGradient: "linear(to-l, #7928CA, #FF0080)",
          }}
        >
          Log in
        </Box>
      </Link>
    );
  }

  if (session) {
    right = (
      <>
        <Flex direction="column">
          <Box pt="12px">user：{session.user.name}</Box>
          <Flex mt="7px" direction="column" minW="150px">
            <Link href="/create">
              <Button
                w="120px"
                m="5px"
                size="sm"
                variant="outline"
                color="gray.700"
              >
                新規作成
              </Button>
            </Link>
            <Button
              w="120px"
              m="5px"
              size="sm"
              variant="outline"
              color="gray.700"
              onClick={() => signOut()}
            >
              ログアウト
            </Button>
          </Flex>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Flex align="center" justify="space-between" minH="70px">
        <Heading
          mt="15px"
          ml="40px"
          p="2px"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
        >
          <Link href="/">Task Manager</Link>
        </Heading>

        {right}
      </Flex>
      {!session && <Welcome />}
    </>
  );
};

export default Header;
