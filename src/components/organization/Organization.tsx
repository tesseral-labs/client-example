import { useOrganization, useTesseral } from "@tesseral/tesseral-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { Tesseral } from "@tesseral/tesseral-vanilla-clientside";
import { Badge } from "../ui/badge";
import { DateTime } from "luxon";

export function Organization() {
  const organization = useOrganization();
  const { frontendApiClient } = useTesseral();

  const [organizationDetails, setOrganizationDetails] = useState<
    Tesseral.Organization | undefined
  >();

  useEffect(() => {
    (async () => {
      const response = await frontendApiClient.organizations.getOrganization();
      setOrganizationDetails(response.organization);
    })();
  }, []);

  return (
    <Card className="border-muted shadow-xl">
      <CardHeader>
        <CardTitle className="text-sm font-semibold tracking-wider text-balance text-muted-foreground uppercase">
          Organization Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div className="text-lg font-semibold tracking-tight text-balance flex items-center">
          <Building2 className="h-5 w-5 mr-2" />
          {organization?.displayName || "Organization Name"}
        </div>
        <div className="gap-2 flex items-center flex-wrap">
          {organizationDetails?.createTime && (
            <Badge variant="secondary">
              Created{" "}
              {DateTime.fromJSDate(organizationDetails.createTime).toRelative()}
            </Badge>
          )}
          {organizationDetails?.updateTime && (
            <Badge variant="secondary">
              Updated{" "}
              {DateTime.fromJSDate(organizationDetails.updateTime).toRelative()}
            </Badge>
          )}
        </div>
        <div className="mt-8 space-y-4">
          <h3 className="text-md font-semibold tracking-tight text-balance">
            Available Login Methods
          </h3>
          <div className="gap-2 flex items-center flex-wrap">
            {organizationDetails?.logInWithEmail && (
              <Badge variant="outline">Email</Badge>
            )}
            {organizationDetails?.logInWithGoogle && (
              <Badge variant="outline">Google</Badge>
            )}
            {organizationDetails?.logInWithMicrosoft && (
              <Badge variant="outline">Microsoft</Badge>
            )}
            {organizationDetails?.logInWithGithub && (
              <Badge variant="outline">GitHub</Badge>
            )}
            {organizationDetails?.logInWithSaml && (
              <Badge variant="outline">SAML</Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <a
          href={`https://console.tesseral.com/organizations/${organization?.id}`}
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
