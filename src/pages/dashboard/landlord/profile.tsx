import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LandlordProfile() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Profile Info */}
      <Card>
        <CardContent className="space-y-6 pt-6 md:flex md:justify-between">
          <h2 className="text-lg font-semibold text-start md:w-1/4">
            Profile information
          </h2>
          <div className="grid grid-cols-1 gap-4 md:w-3/4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="Alicia" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Larsen" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" placeholder="+234-9076-237-409" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" placeholder="alicialarsen09@gmail.com" />
              </div>
            </div>
            <div className="col-span-2 flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder.jpg" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <Button variant="link" className="p-0 text-sm">
                Edit profile image
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Info */}
      <Card>
        <CardContent className="space-y-6 pt-6 md:flex md:justify-between">
          <h2 className="text-lg font-semibold text-start md:w-1/4">
            Business information
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:w-3/4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Company name</Label>
              <Input id="company" placeholder="Alicia" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="rc">RC number</Label>
              <Input id="rc" placeholder="Larsen" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="address">Business address</Label>
              <Input id="address" placeholder="+234-9076-237-409" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-lg font-semibold">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="agent">Enable agent management</Label>
              <Switch
                id="agent"
                defaultChecked
                className="data-[state=checked]:bg-custom-primary data-[state=unchecked]:bg-gray-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotif">Enable email notifications</Label>
              <Switch
                id="emailNotif"
                defaultChecked
                className="data-[state=checked]:bg-custom-primary data-[state=unchecked]:bg-gray-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="directMessage">
                Allow tenants message me directly
              </Label>
              <Checkbox
                id="directMessage"
                defaultChecked
                className="data-[state=checked]:bg-custom-primary data-[state=unchecked]:bg-gray-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline">Back</Button>
        <Button disabled>Save</Button>
      </div>
    </div>
  );
}
