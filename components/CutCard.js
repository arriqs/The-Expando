
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button'

export default function CutCard (props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <TextField value={props.title} onChange= {({target}) => props.setTitle(target.value)} type="text" placeholder="Title"></TextField>
      </div>
      <br />
      <div>
        <TextareaAutosize value={props.tag} onChange={({target}) => props.setTag(target.value)} aria-label="minimum height" rowsMin={3} placeholder="Tag" />
      </div>
      <br />
      <div>
        <TextField value={props.cite1} onChange= {({target}) => props.setCite1(target.value)} type="text" placeholder="Last Name & Year"></TextField>
      </div>
      <br />
      <div>
        <TextareaAutosize value={props.cite2} onChange={({target}) => props.setCite2(target.value)} aria-label="minimum height" rowsMin={3} placeholder="Type in your cite" />
      </div>
      <br />
      <div>
        <TextareaAutosize value={props.content} onChange={({target}) => props.setContent(target.value)} aria-label="minimum height" rowsMin={3} placeholder="Type in your content" />
      </div>
      <br />
      <Button variant='contained' color='primary' type="submit">Save</Button>
      <br />
      <br />
    </form>
  )  
}
