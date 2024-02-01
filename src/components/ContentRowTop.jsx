import ContentRowProducts from "./ContentRowProducts";
import ContentRowUsers from "./ContentRowUsers";
import FrequentProduct from "./FrequentProduct";
import LasProductInDb from "./LastProductInDb";
import MostRequestProduct from "./MostRequestProduct";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./paymentMethod";

function ContentRowTop() {
    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Bienvenido AdminName!</h1>
            </div>

            <ContentRowProducts>
            </ContentRowProducts>

            <ContentRowUsers>
            </ContentRowUsers>

            <div className="row">
                <LasProductInDb>
                </LasProductInDb>
                <MostRequestProduct>
                </MostRequestProduct>

                <FrequentProduct>
                </FrequentProduct>
                <ShippingMethod>
                </ShippingMethod>
                <PaymentMethod>
                </PaymentMethod>
            </div>
        </div>
    )
}

export default ContentRowTop;