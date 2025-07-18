import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  useOrganization,
  useTesseral,
  useUser,
} from "@tesseral/tesseral-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Tesseral } from "@tesseral/tesseral-vanilla-clientside";
import { DateTime } from "luxon";

export function User() {
  const organization = useOrganization();
  const user = useUser();
  const { frontendApiClient } = useTesseral();

  const [organizationDetails, setOrganizationDetails] = useState<
    Tesseral.Organization | undefined
  >();
  const [userDetails, setUserDetails] = useState<Tesseral.User | undefined>();

  useEffect(() => {
    (async () => {
      const userResponse = await frontendApiClient.me.whoami();
      setUserDetails(userResponse.user);

      const orgResponse =
        await frontendApiClient.organizations.getOrganization();
      setOrganizationDetails(orgResponse.organization);
    })();
  }, []);

  return (
    <Card className="border-muted shadow-xl">
      <CardHeader>
        <CardTitle className="text-sm font-semibold tracking-wider text-balance text-muted-foreground uppercase">
          User Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 flex-grow">
        <div className="flex space-x-4 items-center">
          <Avatar className="h-12 w-12 rounded-lg">
            {user?.profilePictureUrl ? (
              <AvatarImage src={user.profilePictureUrl} alt={user?.email} />
            ) : (
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {(user?.displayName || user?.email).charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              {user?.displayName && (
                <span className="text-sm text-muted-foreground tracking-loose ">
                  {user.displayName}
                </span>
              )}
              {userDetails?.owner && <Badge>Owner</Badge>}
            </div>
            {user?.email && (
              <div className="font-semibold tracking-tight text-balance">
                {user.email}
              </div>
            )}
          </div>
        </div>

        <div className="gap-2 flex items-center flex-wrap">
          {userDetails?.createTime && (
            <Badge variant="secondary">
              Created {DateTime.fromJSDate(userDetails.createTime).toRelative()}
            </Badge>
          )}
          {userDetails?.updateTime && (
            <Badge variant="secondary">
              Updated {DateTime.fromJSDate(userDetails.updateTime).toRelative()}
            </Badge>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-md font-semibold tracking-tight text-balance">
            Registered Login Methods
          </h3>
          <div className="gap-2 flex items-center flex-wrap">
            {userDetails?.email && organizationDetails?.logInWithEmail && (
              <Badge variant="outline">Email</Badge>
            )}
            {userDetails?.googleUserId &&
              organizationDetails?.logInWithGoogle && (
                <Badge variant="outline">Google</Badge>
              )}
            {userDetails?.microsoftUserId &&
              organizationDetails?.logInWithMicrosoft && (
                <Badge variant="outline">Microsoft</Badge>
              )}
            {userDetails?.githubUserId &&
              organizationDetails?.logInWithGithub && (
                <Badge variant="outline">GitHub</Badge>
              )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <a
          href={`https://console.tesseral.com/organizations/${organization?.id}/users/${user?.id}`}
          target="_blank"
        >
          <Button size="sm" variant="outline">
            View in Tesseral Console
            <ArrowRight />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
