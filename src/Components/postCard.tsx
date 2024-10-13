import { Text,StyleSheet, TouchableOpacity } from 'react-native'
import { Post} from '../supabase/api';
import { Card } from './Themed';
import { FontAwesome } from "@expo/vector-icons";

interface Props {
    post: Post;
    onDelete: () => void;
    onUpdate: () =>void;
  }
  export default function PostCard({ post, onDelete, onUpdate }: Props) {
  return (
    <Card style={styles.container}>
       {/* Content */}
       <Card style={styles.content}>
       <Text style={styles.contentText}>{post.Nombre}</Text>
       {/* Footer */}
       <Card style={styles.footer}>
         <TouchableOpacity onPress={onDelete}>
           <FontAwesome name="trash-o" size={24} color={"#fffff"} />
         </TouchableOpacity>
         <TouchableOpacity onPress={onUpdate}>
           <FontAwesome name="arrow-circle-o-up" size={24} color={"#fffff"} />
         </TouchableOpacity>
         
       </Card>
     </Card>
   </Card>
 );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: "#0000",  
  },
  content: {
    padding: 16,
  },
  contentText: {
    fontSize: 16,
    color: "#fffff",  // Negro
  },
  footer: {
    paddingTop: 8,
    flexDirection:"row",
    justifyContent:"space-between",
  },
});
