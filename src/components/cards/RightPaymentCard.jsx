import { RiRefund2Fill } from "react-icons/ri"

const RightPaymentCard = () => {
  return (
    <div className="containerRight">
    <div className="right">
      <div className="amount">
        $ <span>500</span>
      </div>

      <div className="details">Paid . 27 November 2025</div>
        <RiRefund2Fill className="refundIcon" title="Refund Transaction"/>
    </div>
    </div>
  )
}

export default RightPaymentCard
