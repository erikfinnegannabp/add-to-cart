export class UserData {
  public name: string;
  public streetAddress: string;
  public city: string;
  public stateTerritoryRegionProvince: string;
  public zipCode: string;
  public country: string;
  public contactPhone: string;
  public contactEmail: string;

  constructor(name: string, streetAddress: string, city: string, stateTerritoryRegionProvince: string,
    zipCode: string, country: string, contactPhone: string, contactEmail: string)
  {
    this.name = name;
    this.streetAddress = streetAddress;
    this.city = city;
    this.stateTerritoryRegionProvince = stateTerritoryRegionProvince;
    this.zipCode = zipCode;
    this.country = country;
    this.contactPhone = contactPhone;
    this.contactEmail = contactEmail;
  }
}
