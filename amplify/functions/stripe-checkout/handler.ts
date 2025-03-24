import { verifyWebhookSig } from "./helpers/verifyStripeWebhook";
import { env } from "$amplify/env/stripe-checkout";
import { sendHTMLEmail } from "../sendViewEmail/sendHTMLEmail";
import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  ListUsersCommand,
  AdminUpdateUserAttributesCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const user_pool_id = env.AMPLIFY_AUTH_USERPOOL_ID;
const client = new CognitoIdentityProviderClient();

const updateUserAttribute = async (
  email: string,
  attributeName: string,
  attributeValue: string
) => {
  try {
    const command = new ListUsersCommand({
      UserPoolId: user_pool_id,
      Filter: `email = "${email}"`,
    });

    const response = await client.send(command);

    if (response.Users?.length === 0) {
      throw new Error("User not found");
    }

    const user = response.Users?.at(0);
    const userSub = user?.Attributes?.find(
      (attr) => attr.Name === "sub"
    )?.Value;

    if (userSub) {
      const updatecommand = new AdminUpdateUserAttributesCommand({
        UserPoolId: user_pool_id,
        Username: userSub,
        UserAttributes: [
          {
            Name: `custom:${attributeName}`,
            Value: attributeValue,
          },
        ],
      });

      const getcommand = new AdminGetUserCommand({
        UserPoolId: user_pool_id,
        Username: userSub,
      });

      const response = await client.send(updatecommand);

      const user = await client.send(getcommand);

      console.log("Subscription plan updated: ", response, user);
    }

    return "updated";
  } catch (err) {
    console.log(err, "ERROR UPDATING SUBSCRIPTION");
    throw Error("Subscription failed!");
  }
};

const mainFlow = async (
  customerEmail: string | null | undefined,
  payment_link: string | undefined
) => {
  if (!customerEmail) throw new Error("Stripe customer email not found");

  if (!payment_link) throw new Error("Stripe payment link undefined!");

  let subscriptionVal = "";

  if (
    payment_link === "plink_1Pihs6FMVOXnkbepkq4WGkuF" ||
    payment_link === "plink_1PjdsYFMVOXnkbep02hUpE0a"
  ) {
    subscriptionVal = "PRO";
    //  UPDATED BY MOAZAM
  } else if (
    payment_link === "plink_1R5P6cDEtadHu4lceqH0NItX" ||
    payment_link === "plink_1PjdqVFMVOXnkbeps7tUm1Y4"
  ) {
    subscriptionVal = "STANDARD";
  }

  await updateUserAttribute(customerEmail, "subscription", subscriptionVal);

  try {
    if (subscriptionVal !== "") {
      const fromEmailAddress = "subscription@app.rezlinks.com";
      const toAddresses = [""]; //add user email address
      const subject = `${subscriptionVal} SUBSCRIPTION!`;
      const html = `Congratulation ${customerEmail}!! Your subscription plan got updated to ${subscriptionVal} :).`;

      console.log(
        "EMAIL SENDING...",
        fromEmailAddress,
        toAddresses,
        subject,
        html
      );

      //await sendHTMLEmail(fromEmailAddress, toAddresses, subject, html);

      return subscriptionVal;
    }
  } catch (err) {
    console.log("MAINFLOW FAILED TO SEND EMAIL", err);
    throw Error("MAINFLOW FAILED TO SEND EMAIL");
  }
};

export const handler = async (event: any) => {
  const stripeEvent = await verifyWebhookSig(event);
  switch (stripeEvent.type) {
    case "checkout.session.completed":
      let subscription = await mainFlow(
        stripeEvent.data.object.customer_details?.email,
        stripeEvent.data.object.payment_link?.toString()
      );
      return `Subscription Added ${subscription}`;
  }
};
